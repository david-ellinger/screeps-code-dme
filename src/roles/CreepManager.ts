import { SpawnCreeps } from 'spawn/SpawnCreeps';
import { Builder } from './Builder';
import { Hauler } from './Hauler';
import { Miner } from './Miner';
import { Repairer } from './Repairer';
import { Upgrader } from './Upgrader';
export class CreepManager {

    public static run() {
        CreepManager.doRun();
        CreepManager.spawn();
    }

    public static doRun() {
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            switch (creep.memory.role) {
                case "miner":
                    Miner.run(creep);
                    break;
                case "hauler":
                    Hauler.run(creep);
                    break;
                case "builder":
                    Builder.run(creep);
                    break;
                case "upgrader":
                    Upgrader.run(creep);
                    break;
                case "repairer":
                    Repairer.run(creep);
                    break;
            }
        };
    }

    public static spawn() {
        if (Game.time % 50 === 0) {
            for (const name in Game.rooms) {
                SpawnCreeps.run(Game.rooms[name]);
            }
        }
    }

}
