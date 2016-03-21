'use strict';

import * as path from 'path';
import * as Git from 'git-wrapper';
import * as Promise from 'bluebird';
import * as util from './util';

export default class GitChanges {

	private dtPath: string;
	private remote: string;

	constructor(dtPath: string, remote: string) {
		this.dtPath = dtPath;
		this.remote = remote;
	}

	public readChanges(): Promise<string[]> {
		let dir = path.join(this.dtPath, '.git');
		const remote = this.remote;

		return util.fileExists(dir).then((exists) => {
			if (!exists) {
				throw new Error('cannot locate git-dir: ' + dir);
			}
			return new Promise<string[]>((resolve: (result: string[]) => void, reject: (error: any) => void) => {
				let args = ['--name-only ' + remote];
				let opts = {};
				let git = new Git({
					'git-dir': dir
				});
				git.exec('diff', opts, args, (err: Error, msg: string) => {
					if (err) {
						reject(err);
					} else {
						resolve(msg.replace(/^\s+/, '').replace(/\s+$/, '').split(/\r?\n/g));
					}
				});
			});
		});
	}
}
