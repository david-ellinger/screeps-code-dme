import { StructureHelper } from "utils/StructureHelper";

import { CreepHelper } from "utils/CreepHelper";

export class Hauler {
    public static run(creep: Creep) {
        const source = creep.pos.findClosestByPath(FIND_SOURCES);
        const controller = creep.room.controller;
        const resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

        if (creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.carry.energy === 0) {
            creep.memory.working = false;
        }

        if (creep.memory.working) {
            const closestTarget = StructureHelper.closestSpawnOrExtension(creep);
            CreepHelper.transferTo(creep, closestTarget as any, RESOURCE_ENERGY)
        } else {
            if (resource) {
                CreepHelper.pickupTo(creep, resource);
            } else {
                CreepHelper.harvestTo(creep, source as any);
            }
        }
    }
}
