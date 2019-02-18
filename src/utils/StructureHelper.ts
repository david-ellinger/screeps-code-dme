export class StructureHelper {
    public static constructionSites(room: Room): ConstructionSite[] {
        return room.find(FIND_CONSTRUCTION_SITES);
    }

    public static sources(room: Room): Source[] {
        return room.find(FIND_SOURCES);
    }

    // find closest container/storage that has at least the amount of energy a creep needs
    public static closestContainerOrStorageForPickup(creep: Creep): StructureContainer | StructureStorage | null {
        const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure =>
                (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE) &&
                structure.store[RESOURCE_ENERGY] > (creep.carryCapacity - creep.carry.energy)
        });
        return target as StructureContainer | StructureStorage;
    }

    // find closest spawner or extension that is not full
    public static closestSpawnOrExtension(creep: Creep) {
        const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure =>
                (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity
        });
        return target;
    }

    // find closest construction site
    public static closestConstructionSite(creep: Creep): ConstructionSite | null {
        const target: ConstructionSite | null = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        return target;
    }

    // find all extensions in current room
    public static extensionsInRoom(room: Room): StructureExtension[] | null {
        const extensions = room.find(FIND_MY_STRUCTURES, {
            filter: (structure: Structure) => {
                return structure.structureType === STRUCTURE_EXTENSION
            }
        })
        return extensions as StructureExtension[] | null;
    }

    // find all towers in current room
    public static towersInRoom(room: Room): StructureTower[] {
        const towers = room.find(FIND_MY_STRUCTURES, {
            filter: (structure: Structure) => {
                return structure.structureType === STRUCTURE_TOWER
            }
        })
        return towers as StructureTower[];
    }

    public static spawnsInRoom(room: Room): StructureSpawn[] {
        const spawns = room.find(FIND_MY_STRUCTURES, {
            filter: (structure: Structure) => {
                return structure.structureType === STRUCTURE_SPAWN;
            }
        })
        return spawns as StructureSpawn[];
    }

    // find any structure or construction site with a range
    public static structuresOrConstructionWithin(focus: Source | Structure, search: StructureConstant, range: number): number {
        const structures: Structure[] = focus.pos.findInRange(FIND_STRUCTURES, range, {
            filter: (structure: Structure) => {
                return structure.structureType === search
            }
        });
        const constructionSites: ConstructionSite[] = focus.pos.findInRange(FIND_CONSTRUCTION_SITES, range, {
            filter: (construction: ConstructionSite) => {
                return construction.structureType
            }
        });
        const targets: number = Array.prototype.push.apply(structures, constructionSites)
        return targets;
    }
}
