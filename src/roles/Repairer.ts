import { CreepHelper } from "utils/CreepHelper";

export class Repairer {
    public static run(creep: Creep) {
        const damagedStructures: Structure | null = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: s => s.hits < s.hitsMax
        });
        const resource: Resource | null = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: r => r.amount > creep.carryCapacity - creep.carry.energy
        });
        const source: Source | null = creep.pos.findClosestByPath(FIND_SOURCES)!;

        if (creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.carry.energy === 0) {
            creep.memory.working = false;
        }

        // Collect energy until you fill up, then go build.
        if (creep.memory.working) {
            if (damagedStructures) {
                CreepHelper.repairTo(creep, damagedStructures);
            }
        } else {
            if (resource) {
                CreepHelper.pickupTo(creep, resource);
            } else {
                CreepHelper.harvestTo(creep, source);
            }
        }

        // If you are done, just suicide. A creep that needs energy will come pick up any dropped energy
        if (!damagedStructures) {
            creep.suicide();
        }
    }
}
