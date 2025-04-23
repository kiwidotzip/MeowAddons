import Party from "../../BloomCore/Party";
import { FeatManager } from "./helperfunction";
import { getServerTPS } from "../../tska/shared/ServerTick.js"

const PartyCmd = FeatManager.createFeature("partycmd");
PartyCmd
	.register("chat", (name) => { 
		if (name !== Player.getName() && Party.leader === Player.getName()) ChatLib.command(`party transfer ${name}`)
	}, /Party > (?:\[([^\]]*?)\] )?(\w{1,16}) (?:\s[^\s\[\]:]+)?: !ptme$/)
	.register("chat", () => { 
		if (Party.leader === Player.getName()) ChatLib.command(`party warp`)
	}, /Party > (?:\[([^\]]*?)\] )?(\w{1,16}) (?:\s[^\s\[\]:]+)?: !warp$/)
	.register("chat", () => {
		if (Party.leader === Player.getName()) ChatLib.command(`party settings allinvite`)
	}, /Party > (?:\[([^\]]*?)\] )?(?:\w{1,16}) (?:\s[^\s\[\]:]+)?: !allinv$/)
	.register("chat", () => {
		if (Party.leader === Player.getName()) ChatLib.command(`party settings kickoffline`)
	}, /Party > (?:\[([^\]]*?)\] )?(?:\w{1,16}) (?:\s[^\s\[\]:]+)?: !kickoffline$/)
	.register("chat", (player) => {
		if (Party.leader === Player.getName()) ChatLib.command(`party invite ${player}`)
	}, /Party > (?:\[([^\]]*?)\] )?(?:\w{1,16}) (?:\s[^\s\[\]:]+)?: !(?:inv|invite|p|party) (.+)$/)
	.register("chat", () => { 
		ChatLib.command(`pc [MA] TPS: ${getServerTPS()}`)
	}, /Party > (?:\[([^\]]*?)\] )?(?:\w{1,16}) (?:\s[^\s\[\]:]+)?: !tps$/)
	.register("chat", () => {
		ChatLib.command(`pc [MA] Ping: ${Server.getPing()}`)
	}, /Party > (?:\[([^\]]*?)\] )?(?:\w{1,16}) (?:\s[^\s\[\]:]+)?: !ping$/)