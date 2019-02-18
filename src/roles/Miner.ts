import { CreepHelper } from "utils/CreepHelper";
import { getAvailableSource } from "utils/getAvailableSource";

export class Miner {
    public static run(creep: Creep) {
        const source = creep.pos.findClosestByPath(FIND_SOURCES);
        CreepHelper.harvestTo(creep, source as Source);
        creep.drop(RESOURCE_ENERGY);
    }


}
