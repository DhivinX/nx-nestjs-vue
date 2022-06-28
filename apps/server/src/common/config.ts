import { readFileSync } from 'fs';
import path from 'path';
import * as yamlParser from 'js-yaml';
import { assetsDir } from './filesystem';

const YAML_CONFIG_FILENAME = path.resolve(assetsDir(), './config.yaml');

const yaml = () => {
    return yamlParser.load(readFileSync(YAML_CONFIG_FILENAME, 'utf8')) as Record<string, any>;
};

export const config = {
    yaml,
};
