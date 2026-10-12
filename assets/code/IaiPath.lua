-- shared between server and client so the dash ends in the exact same spot on both
-- stops before walls, and never ends inside someone - if the end lands on a target
-- it gets pushed past them (that's what makes the "pass through" look work)

local CollectionService = game:GetService("CollectionService")

local CombatConfig = require(script.Parent:WaitForChild("CombatConfig"))
local DashMotion = require(script.Parent:WaitForChild("DashMotion"))

local IaiPath = {}

local CFG = CombatConfig.Iai
local CLEARANCE = 3.2 -- min distance between where you stop and someone's center

local function passThrough(attacker, from, dir, dist)
	-- 3 passes is plenty, it only matters when people are standing in a line
	for _ = 1, 3 do
		local finish = from + dir * dist
		local pushed = false
		for _, model in CollectionService:GetTagged("Combatant") do
			local root = model ~= attacker and model:FindFirstChild("HumanoidRootPart")
			if not root then
				continue
			end
			local offset = root.Position - finish
			if Vector3.new(offset.X, 0, offset.Z).Magnitude < CLEARANCE and math.abs(offset.Y) < 5 then
				local along = (root.Position - from):Dot(dir)
				dist = math.max(dist, along + CLEARANCE)
				pushed = true
			end
		end
		if not pushed then
			break
		end
	end
	return dist
end

function IaiPath.distance(attacker: Model, from: Vector3, dir: Vector3, charge: number): number
	local wanted = CFG.MinDistance + (CFG.MaxDistance - CFG.MinDistance) * charge
	-- same wall check the dash itself does, otherwise the cut and the body could disagree
	local limit = DashMotion.clearDistance(from, dir, CFG.MaxDistance + CLEARANCE * 2)
	return math.min(passThrough(attacker, from, dir, wanted), limit)
end

return IaiPath
