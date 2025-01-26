/* This is a Script named Verify. Replace base url with your bot's base url */
game.Players.PlayerAdded:Connect(function(player)
	local code = player:GetJoinData().LaunchData
	if code then
		local baseUrl = "/verify"
		local userId = player.UserId
		local url = string.format("%s?c=%s&i=%s", baseUrl, code, tostring(userId))
		local httpService = game:GetService("HttpService")
		local success, response = pcall(function()
			return httpService:RequestAsync({
				Url = url,
				Method = "PUT",
				Headers = { ["Content-Type"] = "application/json" }
			})
		end)

		if success and response.StatusCode == 200 then
			if response.Body == "true" then
				game.ReplicatedStorage.SMSG:FireClient(player, 'Successfully connected roblox account!')
			else
				game.ReplicatedStorage.SMSG:FireClient(player, 'Error connecting account: Invalid Code.')
			end
		else
			game.ReplicatedStorage.SMSG:FireClient(player, 'Error connecting account: Server Error.')
		end
	end
end)