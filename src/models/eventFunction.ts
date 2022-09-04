export interface IEventFunction {
    name?: string;
    disabled: boolean;
    description: string;
    channels: Array<string>;
    once: boolean;

    run(): void;
}