export class StructureHelper {
    public static constructionSites(room: Room): ConstructionSite[] {
        return room.find(FIND_CONSTRUCTION_SITES);
    }

    public static sources(room: Room): Source[] {
        return room.find(FIND_SOURCES);
    }

    public static extensionsInRoom(room: Room): StructureExtension[] | null {
        const extensions = room.find(FIND_MY_STRUCTURES, {
            filter: (structure: Structure) => {
                return structure.structureType === STRUCTURE_EXTENSION
            }
        })
        return extensions as StructureExtension[] | null;
    }

    public static closestSpawnOrExtension(creep: Creep) {
        const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: structure =>
            (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity
        });
        return target;
      }
}
