import { getAvailableSource } from "utils/getAvailableSource";

export class Harvester {
    public static run(creep: Creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            Harvester.harvestEnergy(creep);
        } else {
            Harvester.giveEnergyToStructures(creep);
        }
    }

    public static harvestEnergy(creep: Creep) {
        // Move and harvest
        const sources = creep.room.find(FIND_SOURCES, {
            filter: (s: Source) => {
                return s.id === creep.memory.source;
            }
        });
        const source = sources[0];
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source,
                { visualizePathStyle: { stroke: "#00ff00" } });
        }
    }

    public static giveEnergyToStructures(creep: Creep) {
        // Bring energy to structures
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION
                    || structure.structureType === STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }

    public static factory() {
        if (Game.spawns.Spawn1.room.energyAvailable >= 300) {
            const newName = 'Harvester' + Game.time;

            Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE, WORK, CARRY, MOVE], newName,
                { memory: { role: 'harvester', source: getAvailableSource() } } as any);
            console.log(`Spawning new harvester: ${newName}.`);
            ;
        }
    }
}
