/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* NPC: Donation Box (9000041)
	Victoria Road : Henesys
	
	NPC Bazaar:
        * @author Ronan Lana
*/

var options = ["EQUIP","USE","SET-UP","ETC"];
var name;
var status;
var selectedType = 0;

function start() {
    status = -1;
    action(1, 0, 0); 
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        cm.dispose();
        return;
    }

    if (status == 0) {
        if (!Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
            cm.sendOk("The medal ranking system is currently unavailable...");
            cm.dispose();
            return;
        }
        
        var selStr = "Hello, I am the #bDonation Box#k! I can clear your inventory of junk or glitched items. #rWARNING#b: Make sure you are ready to sell all items #rAFTER#b the item you have selected to sell as well.#k Any items #bunder#k the item selected will be sold.";
        for (var i = 0; i < options.length; i++)
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        cm.sendSimple(selStr);
    }

    else if (status == 1) {
	selectedType = selection;
        cm.sendGetText("From what item on your #r" + options[selectedType] + "#k inventory do you want to start the transaction?");
    }

    else if (status == 2) {
        name = cm.getText();
	var res = cm.getPlayer().sellAllItemsFromName(selectedType + 1, name);

        if(res > -1) cm.sendOk("Transaction complete! You received #r" + cm.numberWithCommas(res) + " mesos#k from this action.");
	else cm.sendOk("There is no #b'" + name + "'#k in your #b" + options[selectedType] + "#k inventory!");

        cm.dispose();
    }
}