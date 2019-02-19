export class CreepHelper {
    // transfer resource to target or move to that target.
    public static transferTo(creep: Creep, target: StructureExtension | StructureStorage, resource: ResourceConstant): any {
        if (creep.transfer(target, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }

    // harvest a source or move to that source
    public static harvestTo(creep: Creep, source: Source) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }

    // pick up a resource or move to that resource
    public static pickupTo(creep: Creep, destination: Resource) {
        if (creep.pickup(destination) === ERR_NOT_IN_RANGE) {
            creep.moveTo(destination);
        }
    }

    // build a construction site or move to that site
    public static buildTo(creep: Creep, constructionSite: ConstructionSite) {
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionSite);
        }
    }

    public static repairTo(creep: Creep, structure: Structure) {
        if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }
    }

    // upgrade a controller or move to that controller
    public static upgradeTo(creep: Creep, controller: StructureController) {
        if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(controller);
        }
    }

    // withdraw a resource from container/storage or move to that container/storage
    public static withdrawTo(creep: Creep, destination: StructureContainer | StructureStorage, resource: ResourceConstant) {
        if (creep.withdraw(destination, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(destination);
        }
    }
}
