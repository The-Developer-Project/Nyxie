/*This is a LocalScript named ChatReciever Create a RemoteEvent called SMSG under ReplicatedStorage
game.ReplicatedStorage.SMSG.OnClientEvent:Connect(function(msg)
	game.StarterGui:SetCore( "ChatMakeSystemMessage",  { Text = msg, Color = Color3.fromRGB(0, 255, 255), Font = Enum.Font.Arial, FontSize = Enum.FontSize.Size24 } )
end)