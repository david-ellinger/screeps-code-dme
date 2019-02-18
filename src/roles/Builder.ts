import { getAvailableSource } from "utils/getAvailableSource";
import { Harvester } from "./Harvester";

export class Builder {
    public static run(creep: Creep) {
        if ((creep.memory as any).building && creep.carry.energy === 0) {
            (creep.memory as any).building = false;
            creep.say('🔄 harvest');
        }
        if (!(creep.memory as any).building && creep.carry.energy === creep.carryCapacity) {
            (creep.memory as any).building = true;
            creep.say('🚧 build');
        }

        if ((creep.memory as any).building) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                const spawnOrExtension = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION
                            || structure.structureType === STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
                if (spawnOrExtension.length > 0) {
                    if (creep.transfer(spawnOrExtension[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawnOrExtension[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        } else {
            Harvester.harvestEnergy(creep);
        }
    }

    public static factory() {
        if (Game.spawns.Spawn1.room.energyAvailable >= 300) {
            const newName = 'Builder' + Game.time;

            Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE, WORK, CARRY, MOVE], newName,
                { memory: { role: 'builder', source: getAvailableSource() } } as any);
            console.log(`Spawning new builder: ${newName}.`);
        }
    }
}
