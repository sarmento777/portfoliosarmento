-- M1 combo + heavy attack. server side, players and npcs go through the same path
-- so the sensei can't do anything a player couldn't

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local Combat = ReplicatedStorage:WaitForChild("Combat")
local CombatConfig = require(Combat:WaitForChild("CombatConfig"))
local DrawState = require(Combat:WaitForChild("DrawState"))
local CombatFX = Combat:WaitForChild("Remotes"):WaitForChild("CombatFX")

local Hitbox = require(script.Parent:WaitForChild("Hitbox"))
local CombatResolver = require(script.Parent:WaitForChild("CombatResolver"))
local Signal = require(script.Parent:WaitForChild("Signal"))

local ComboService = {}

-- (attacker, kind, hitDelay, comboIndex) - the duel ai listens to this to block/parry
ComboService.AttackStarted = Signal.new()

local M1 = CombatConfig.M1
local HEAVY = CombatConfig.Heavy
local WEAPON = "Katana"
local MAX_COMBO = #M1.Damage

local states = setmetatable({}, { __mode = "k" })

local function now()
	return workspace:GetServerTimeNow()
end

local function getState(model)
	local s = states[model]
	if not s then
		s = { index = 0, lastAttack = 0, busyUntil = 0, heavyReady = 0 }
		states[model] = s
	end
	return s
end

function ComboService.canAttack(model: Model?): boolean
	if not model then return false end
	local hum = model:FindFirstChildOfClass("Humanoid")
	if not hum or hum.Health <= 0 or not model:FindFirstChild(WEAPON) then
		return false
	end

	-- players get a little slack on the draw timer because of ping
	local grace = Players:GetPlayerFromCharacter(model) and CombatConfig.Draw.ServerGrace or 0
	if DrawState.isDrawing(model, grace) then
		return false
	end

	if (model:GetAttribute("StunnedUntil") or 0) > now() then
		return false
	end
	return not (model:GetAttribute("Blocking") or model:GetAttribute("IaiCharging") or model:GetAttribute("CombatLocked"))
end

function ComboService.heavyReady(model: Model): boolean
	return now() >= getState(model).heavyReady
end

function ComboService.setBusy(model: Model, seconds: number)
	local s = getState(model)
	s.busyUntil = math.max(s.busyUntil, now() + seconds)
end

function ComboService.isBusy(model: Model): boolean
	return now() < getState(model).busyUntil
end

local function resolveM1(model, plr, index)
	-- could've been stunned/parried between the click and the blade landing
	if not ComboService.canAttack(model) then
		return
	end

	local dmg = M1.Damage[index]
	if not plr and model:GetAttribute("Sparring") then
		dmg = CombatConfig.Sparring.Damage
	end
	dmg *= model:GetAttribute("DamageScale") or 1

	for _, target in Hitbox.cone(model, M1.Range, M1.Angle, plr and M1.LatencyGrace or 0) do
		CombatResolver.hit(model, plr, target, {
			kind = "M1",
			damage = dmg,
			stagger = M1.StaggerHits[index] == true,
			combo = index,
			knockback = M1.Knockback[index],
			lift = M1.Lift[index],
			stun = M1.StunTime[index],
		})
	end
end

function ComboService.performM1(model: Model, plr: Player?): number?
	if not ComboService.canAttack(model) then
		return nil
	end
	local s = getState(model)
	local t = now()
	if t < s.busyUntil then
		return nil -- spam clicking just gets dropped
	end

	if t - s.lastAttack > M1.ComboWindow or s.index >= MAX_COMBO then
		s.index = 1
	else
		s.index += 1
	end
	local index = s.index
	-- print(model.Name, "m1", index, t - s.lastAttack)
	s.lastAttack = t
	s.busyUntil = t + (index == MAX_COMBO and M1.EndLag or M1.Cooldown)

	CombatFX:FireAllClients("Swing", { attacker = model, index = index })
	task.delay(M1.HitDelay[index], resolveM1, model, plr, index)
	ComboService.AttackStarted:Fire(model, "M1", M1.HitDelay[index], index)
	return index
end

function ComboService.requestM1(plr: Player)
	ComboService.performM1(plr.Character, plr)
end

local function resolveHeavy(model, plr)
	if not ComboService.canAttack(model) then
		return
	end
	local dmg = HEAVY.Damage
	if not plr and model:GetAttribute("Sparring") then
		dmg = CombatConfig.Sparring.HeavyDamage
	end
	dmg *= model:GetAttribute("DamageScale") or 1

	for _, target in Hitbox.cone(model, HEAVY.Range, HEAVY.Angle, plr and M1.LatencyGrace or 0) do
		CombatResolver.hit(model, plr, target, {
			kind = "Heavy",
			damage = dmg,
			stagger = true,
			knockback = HEAVY.Knockback,
			lift = HEAVY.Lift,
			stun = HEAVY.StunTime,
		})
	end
end

function ComboService.performHeavy(model: Model, plr: Player?): boolean
	if not ComboService.canAttack(model) then
		return false
	end
	local s = getState(model)
	local t = now()
	if t < s.busyUntil or t < s.heavyReady then
		return false
	end
	s.heavyReady = t + HEAVY.Cooldown
	s.busyUntil = t + HEAVY.Windup + 0.35
	s.index = 0 -- heavy breaks the combo chain

	CombatFX:FireAllClients("Heavy", { attacker = model, windup = HEAVY.Windup })
	task.delay(HEAVY.Windup, resolveHeavy, model, plr)
	ComboService.AttackStarted:Fire(model, "Heavy", HEAVY.Windup)
	return true
end

function ComboService.requestHeavy(plr: Player)
	ComboService.performHeavy(plr.Character, plr)
end

return ComboService
