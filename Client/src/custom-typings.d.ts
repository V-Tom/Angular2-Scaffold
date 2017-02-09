declare const ENV: string
declare const HMR: any

interface GlobalEnvironment {
    ENV: string;
    HMR: boolean;
}

interface Global extends GlobalEnvironment {
}