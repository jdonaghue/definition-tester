export interface ITestOptions {
	testerPath: string;
	dtPath: string;
	concurrent: number;
	tscPath?: string;
	tslintConfig: string;

	changes: boolean;
	gitRemote: string;
	tests: boolean;
	lint: boolean;
	headers: boolean;
	tscparams: boolean;

	debug: boolean;
	printFiles: boolean;
	printRefMap: boolean;
}
