function selectDisaster(disaster) {
    if (disaster !== "") {
        window.location.href = "disaster.html?type=" + disaster;
    }
}
