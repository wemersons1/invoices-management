function getUserYears(birthDay: string) {
    const dateBirthDay = new Date(birthDay);
    const today = new Date();
    let years = today.getFullYear() - dateBirthDay.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    const monthBirthDay = dateBirthDay.getMonth();
    const dayBirthDay = dateBirthDay.getDate();

    if (currentMonth < monthBirthDay || (currentMonth === monthBirthDay && currentDay < dayBirthDay)) {
        years--;
    }

    return `${years} Years`;
}

export { getUserYears };