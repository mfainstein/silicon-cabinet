export class Discussion {
    constructor(context) {
        console.log("Discussing: " + context + "\n");
        this.context = context;
        this.arguments = [];
    }

    addArgument(role, body, color) {
        console.log(color(role + ": " + body));
        this.arguments.push({ role, body, color });
    }

    print() {
        console.log("Discussing: " + this.context + "\n");
        for (let argument of arguments) {
            this.printArgument(argument);
        }
    }

    toString() {
        let discussion = this.context + "/n";
        discussion = discussion + this.getArguments().map((item)=>item.role+" : "+item.body).join("/n");
        return discussion;
    }

    printArgument(argument) {
        let color = argument.color;
        console.log(color(argument.role + ": " + argument.body));
    }

    getArguments() {
        return this.arguments;
    }

    getContext(){
        return this.context;
    }

}