import { StructureHelper } from "utils/StructureHelper";

export class SpawnCreeps {
    public static run(room: Room) {
        const roles = this.buildRoles(room);
        this.spawn(room, roles);
    }

    public static buildRoles(room: Room) {
        const constructionCount = StructureHelper.constructionSites(room).length;
        const sourceCount = StructureHelper.sources(room).length;
        const damagedStructures = StructureHelper.damagedStructures(room).length;
        const roles = {
            builder: {
                count: Math.ceil(constructionCount / 4),
                tier: {
                    1: { parts: [WORK, WORK, CARRY, MOVE] },
                    2: { parts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] },
                    3: { parts: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] },
                    4: {
                        parts: [
                            WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                        ]
                    }
                }
            },
            hauler: {
                count: sourceCount,
                tier: {
                    1: { parts: [WORK, WORK, CARRY, MOVE] },
                    2: { parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] },
                    3: {
                        parts: [
                            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE
                        ]
                    },
                    4: {
                        parts: [
                            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE
                        ]
                    }
                }
            },
            miner: {
                count: sourceCount,
                tier: {
                    1: { parts: [WORK, WORK, CARRY, MOVE] },
                    2: { parts: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE] },
                    3: { parts: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE] },
                    4: { parts: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE] }
                }
            },
            repairer: {
                count: Math.ceil(damagedStructures / 10),
                tier: {
                    1: { parts: [WORK, WORK, CARRY, MOVE] },
                    2: { parts: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE] },
                    3: { parts: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE] },
                    4: { parts: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE] }
                }
            },
            upgrader: {
                count: 3,
                tier: {
                    1: { parts: [WORK, WORK, CARRY, MOVE] },
                    2: { parts: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE] },
                    3: { parts: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE] },
                    4: { parts: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE] }
                }
            }

        }
        return roles;
    }

    public static spawn(room: Room, roles: any) {
        const tier = this.getSpawnTier(room);
        const spawns = room.find(FIND_MY_SPAWNS);
        for (const spawn of spawns) {
            for (const role of Object.keys(roles)) {
                const creepOfRole = _.filter(Game.creeps, (creep) => {
                    return creep.memory.role === role;
                });
                const newName = role + Game.time;
                console.log(`${role}: ${creepOfRole.length}`);
                if (creepOfRole.length < roles[role].count) {
                    const parts = roles[role].tier[tier].parts;
                    if (spawn.spawnCreep(parts, newName, {
                        memory: {
                            role,
                            room: room.name,
                            working: false
                        }
                    })) {
                        console.log(`Spawning new Tier ${tier} ${role}: ${newName}. `)
                    }
                }
            }
        }
    }

    public static getSpawnTier(room: Room) {
        const extensions = StructureHelper.extensionsInRoom(room);
        if (extensions == null) {
            return 1
        }
        switch (true) {
            case extensions !== null && extensions.length < 5:
                return 1
            case extensions.length < 10:
                return 2
            case extensions.length < 15:
                return 3
            default:
                return 4;
        }
    }

}
