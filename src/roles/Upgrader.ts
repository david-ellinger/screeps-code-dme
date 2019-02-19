import { CreepHelper } from "utils/CreepHelper";
import { StructureHelper } from "utils/StructureHelper";

export class Upgrader {
    public static run(creep: Creep) {
        const source: Source = creep.pos.findClosestByPath(FIND_SOURCES)!;
        const controller: StructureController = creep.room.controller!;
        const resource: Resource | null = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        const container = StructureHelper.closestContainerOrStorageForPickup(creep);

        if (creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.carry.energy === 0) {
            creep.memory.working = false;
        }

        // We try to keep these creeps working. Pick up from a container or dropped resources, worst
        // case harvest.
        if (creep.memory.working) {
            CreepHelper.upgradeTo(creep, controller);
        } else {
            if (container) {
                CreepHelper.withdrawTo(creep, container, RESOURCE_ENERGY);
            } else if (resource) {
                CreepHelper.pickupTo(creep, resource);
            } else {
                CreepHelper.harvestTo(creep, source);
            }
        }
    }
}
