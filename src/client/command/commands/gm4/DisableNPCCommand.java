package client.command.commands.gm4;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import scripting.npc.NPCScriptManager;

public class DisableNPCCommand extends Command {
    {
        setDescription("Prevent players from interacting with an npc (lost on server restart)");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length == 2) {
            try {
                int npcid = Integer.parseInt(params[0]);
                if (params[1].toLowerCase().equals("true")) {
                    if (NPCScriptManager.getInstance().disabledNPCs.contains(npcid)) {
                        player.yellowMessage("NPC " + npcid + " already disabled");
                        return;
                    }
                    NPCScriptManager.getInstance().disabledNPCs.add(npcid);
                    player.yellowMessage("NPC " + npcid + " is disabled");
                    return;
                } else if (params[1].toLowerCase().equals("false")) {
                    if (NPCScriptManager.getInstance().disabledNPCs.contains(npcid)) {
                        NPCScriptManager.getInstance().disabledNPCs.remove(npcid);
                        player.yellowMessage("NPC " + npcid + " enabled");
                        return;
                    }
                    player.yellowMessage("NPC " + npcid + " already enabled");
                    return;
                }
            } catch (Exception e) {
                player.yellowMessage("Syntax: !disableNpc <npc_id> <true/false>");
                return;
            }
        }

        player.yellowMessage("Syntax: !disableNpc <npc_id> <true/false>");
    }
}
