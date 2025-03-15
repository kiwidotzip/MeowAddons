import Config from "../config"
import Party from "../../BloomCore/Party"

register("chat", (rank, name, alias, player) => {
    if (!Config().partycommands) return
    if (Party.leader !== Player.getName()) return

    let message = ChatLib.getChatMessage(event)
    let command = null

    if (Config().partytransfer && /Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !ptme$/.test(message)) {
        if (name === Player.getName()) return
        command = `party transfer ${name}`
    } 
    else if (Config().partywarp && /Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !warp$/.test(message)) {
        command = `party warp`
    } 
    else if (Config().partyallinvite && /Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !allinv$/.test(message)) {
        command = `party settings allinvite`
    } 
    else if (Config().partykickoffline && /Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !kickoffline$/.test(message)) {
        command = `party settings kickoffline`
    } 
    else if (Config().partyinvite && /Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !(inv|invite|p|party) (.+)$/.test(message)) {
        command = `party invite ${player}`
    }

    if (!command) return
    ChatLib.command(command)
    cancel(event)
})
