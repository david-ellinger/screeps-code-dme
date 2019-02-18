import { SpawnCreeps } from 'spawn/SpawnCreeps';
import { Hauler } from './Hauler';
import { Miner } from './Miner';
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
