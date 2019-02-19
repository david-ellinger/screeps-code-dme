import { StructureHelper } from './../utils/StructureHelper';
export class BuildRoads {
    public static run(room: Room) {
        const sources = StructureHelper.sources(room);
        const controller = room.controller!;
        const spawns = StructureHelper.spawnsInRoom(room);
        // Create Road to Controller
        sources.forEach(source => {
            const path: PathStep[] = this.findPath(source.pos, controller.pos, room);
            for (const loc of path) {
                if (room.createConstructionSite(loc.x, loc.y, STRUCTURE_ROAD) === 0) {
                    console.log(`Creating road to controller at: ${room.name}, ${loc.x}, ${loc.y}`);
                }
            }
        });
        // Create Road to spawn
        // sources.forEach(source => {
        //     spawns.forEach(spawn => {
        //         const path: PathStep[] = this.findPath(source.pos, spawn.pos, room);
        //         for (const loc of path) {
        //             if (room.createConstructionSite(loc.x, loc.y, STRUCTURE_ROAD) === 0) {
        //                 console.log(`Creating road to spawn at: ${room.name}, ${loc.x}, ${loc.y}`);
        //             }
        //         }
        //     })

        // });
    }

    public static findPath(from: RoomPosition, to: RoomPosition, room: Room) {
        const path: PathStep[] = room.findPath(from, to, {
            ignoreCreeps: false,
            ignoreRoads: true,
            swampCost: 1
        });
        return path;
    }
}
