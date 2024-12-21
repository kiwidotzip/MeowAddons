import Settings from "../config";
import Party from "../../BloomCore/Party"

register('chat', (rank, name) => {
    if (name === Player.getName()) return;
	if (!Settings.partytransfer) return
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party transfer ${name}`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !ptme$/)

register('chat', (rank, name) => {
	if (!Settings.partywarp) return
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party warp`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !warp$/)

register('chat', (rank, name) => {
	if (!Settings.partyallinvite) return
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party settings allinvite`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !allinv$/)

register('chat', (rank, name) => {
	if (!Settings.partykickoffline) return
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party kickoffline`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !kickoffline$/)

register('chat', (rank, name, alias, player) => {
	if (!Settings.partyinvite) return
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party invite ${player}`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !(inv|invite|p|party) (.+)$/)

