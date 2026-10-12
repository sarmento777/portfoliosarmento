local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Combat = ReplicatedStorage:WaitForChild("Combat")
local CombatConfig = require(Combat:WaitForChild("CombatConfig"))
local CombatFX = Combat:WaitForChild("Remotes"):WaitForChild("CombatFX")

local DamageService = require(script.Parent:WaitForChild("DamageService"))
local Signal = require(script.Parent:WaitForChild("Signal"))

local CombatResolver = {}

CombatResolver.Parried = Signal.new() -- (defender, attacker)

local BLOCK = CombatConfig.Block
local HEAVY = CombatConfig.Heavy

local function now()
	return workspace:GetServerTimeNow()
end

function CombatResolver.stun(model: Model, seconds: number)
	local untilT = now() + seconds
	-- never shorten a stun that's already longer
	if (model:GetAttribute("StunnedUntil") or 0) < untilT then
		model:SetAttribute("StunnedUntil", untilT)
	end
end

-- allowParry is false when the guard comes up on its own (player was still
-- holding F after a stun) - pressing F at the right moment is the whole point of a parry
function CombatResolver.setBlocking(model: Model, on: boolean, allowParry: boolean?)
	model:SetAttribute("Blocking", on or nil)
	if on then
		model:SetAttribute("BlockStart", allowParry == false and 0 or now())
	end

	local hum = model:FindFirstChildOfClass("Humanoid")
	if hum and Players:GetPlayerFromCharacter(model) then
		if on then
			model:SetAttribute("BaseWalkSpeed", model:GetAttribute("BaseWalkSpeed") or hum.WalkSpeed)
			hum.WalkSpeed = BLOCK.WalkSpeed
		else
			hum.WalkSpeed = model:GetAttribute("BaseWalkSpeed") or 16
		end
	end
end

local function knockback(target, from, power, lift)
	local root = target:FindFirstChild("HumanoidRootPart")
	if not root or root.Anchored or (power <= 0 and lift <= 0) then
		return
	end
	local d = root.Position - from
	local dir = Vector3.new(d.X, 0, d.Z)
	dir = dir.Magnitude > 0.01 and dir.Unit or Vector3.new(0, 0, -1)
	local vel = dir * power + Vector3.new(0, lift, 0)

	local plr = Players:GetPlayerFromCharacter(target)
	if plr then
		-- player owns their own physics, so the client has to apply it
		CombatFX:FireClient(plr, "Knockback", { velocity = vel })
	else
		root.AssemblyLinearVelocity = vel
	end
end

-- blocking only works if you're actually facing the hit
local function isFacing(defender, attackerPos)
	local root = defender:FindFirstChild("HumanoidRootPart")
	if not root then
		return false
	end
	local d = attackerPos - root.Position
	local flat = Vector3.new(d.X, 0, d.Z)
	if flat.Magnitude < 0.1 then
		return true
	end
	return root.CFrame.LookVector:Dot(flat.Unit) > 0.1
end

-- order matters: parry > guard break > blocked > clean hit
-- attack = { kind, damage, stagger?, combo?, knockback, lift, stun, origin?, breaksGuard? }
function CombatResolver.hit(attacker: Model, attackerPlayer: Player?, target: Model, attack)
	local aRoot = attacker:FindFirstChild("HumanoidRootPart")
	if not aRoot then
		return "none"
	end
	-- iai passes through the target, so it sends where the slash started from
	local from = attack.origin or aRoot.Position

	if target:GetAttribute("Blocking") and isFacing(target, from) then
		local sinceBlock = now() - (target:GetAttribute("BlockStart") or 0)

		if sinceBlock <= BLOCK.ParryWindow then
			-- print("parry", target.Name, sinceBlock)
			CombatResolver.stun(attacker, BLOCK.ParryStun)
			knockback(attacker, target:GetPivot().Position, 12, 0) -- small shove back, 12 just felt right
			CombatFX:FireAllClients("Parry", { defender = target, attacker = attacker })
			CombatResolver.Parried:Fire(target, attacker)
			return "parry"
		end

		if attack.kind == "Heavy" or attack.breaksGuard then
			CombatResolver.setBlocking(target, false)
			CombatResolver.stun(target, HEAVY.GuardBreakStun)
			DamageService.apply(attackerPlayer, target, attack.damage, { stagger = true, tag = "GUARD BREAK", attacker = attacker })
			knockback(target, from, attack.knockback, attack.lift)
			CombatFX:FireAllClients("GuardBreak", { target = target })
			return "guardbreak"
		end

		DamageService.apply(attackerPlayer, target, attack.damage * (1 - BLOCK.DamageReduction), { blocked = true, tag = "BLOCK", attacker = attacker })
		knockback(target, from, 4, 0)
		CombatFX:FireAllClients("Blocked", { target = target })
		return "blocked"
	end

	DamageService.apply(attackerPlayer, target, attack.damage, {
		kind = attack.kind,
		stagger = attack.stagger,
		heavy = attack.kind == "Heavy",
		combo = attack.combo,
		attacker = attacker,
	})
	CombatResolver.stun(target, attack.stun)
	knockback(target, from, attack.knockback, attack.lift)
	return "hit"
end

return CombatResolver
