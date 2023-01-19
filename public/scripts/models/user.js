export class User {
    constructor(username, avatarUrl) {
        this.username = username;
        this.avatarUrl = avatarUrl;
    }
    getuser() {
        return this.username;
    }
    getAvatarUrl() {
        return this.avatarUrl;
    }
}
