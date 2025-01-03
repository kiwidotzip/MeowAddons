import Config from "../config";
import Party from "../../BloomCore/Party"

register('chat', (rank, name) => {
    if (name === Player.getName()) return;
	if (!Config().partytransfer && !Config().partycommands) return
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party transfer ${name}`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !ptme$/)

register('chat', (rank, name) => {
	if (!Config().partywarp && !Config().partycommands) return
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party warp`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !warp$/)

register('chat', (rank, name) => {
	if (!Config().partyallinvite && !Config().partycommands) return
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party Config() allinvite`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !allinv$/)

register('chat', (rank, name) => {
	if (!Config().partykickoffline && !Config().partycommands) return
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party kickoffline`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !kickoffline$/)

register('chat', (rank, name, alias, player) => {
	if (!Config().partyinvite && !Config().partycommands) return
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party invite ${player}`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !(inv|invite|p|party) (.+)$/)

