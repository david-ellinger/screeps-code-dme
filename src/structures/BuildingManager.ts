import { BuildContainers } from './BuildContainers';
import { BuildRoads } from "./BuildRoads";
import { Visuals } from "./Visuals";

export class BuildingManager {
    public static run(room: Room) {
        if (Game.time % 100 === 0) {
            BuildRoads.run(room);
            BuildContainers.run(room);
        }
        Visuals.run(room);
    }
}
