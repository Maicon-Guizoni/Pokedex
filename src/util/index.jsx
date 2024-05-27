export const typeHandler = (types) => {
    if (types[1]) {
        return types[0].type.name + " | " + types[1].type.name;
    } else {
        return types[0].type.name
    }

}

