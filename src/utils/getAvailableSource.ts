export function getAvailableSource() {
    const sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
    let source = sources[0];
    sources.forEach(s => {
        console.log(`${s.energy} <= ${source.energy}`)
        if (s.energy >= source.energy) {
            source = s;
        }
    })
    return source.id;
}
