import { BuildContainers } from './BuildContainers';
import { BuildRoads } from "./BuildRoads";
import { Visuals } from "./Visuals";

export class BuildingManager {
    public static run(room: Room) {
        if (Game.time % 100 === 0) {
            BuildContainers.run(room);
            BuildRoads.run(room);
        }
        // Visuals.run(room);
    }
}
