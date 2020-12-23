import React, { PureComponent } from 'react';
import { IFiles } from '../../types';

import { File } from './File';
import { Directory } from './Directory';

export interface Props {
  prefixedPath: string;
  files: IFiles;
  selectFile: (path: string) => void;
  activePath: string;
  depth?: number;
}

export class ModuleList extends PureComponent<Props> {
  render(): JSX.Element {
    const {
      depth = 0,
      activePath,
      selectFile,
      prefixedPath,
      files,
    } = this.props;

    const fileListWithoutPrefix = Object.keys(files)
      .filter(file => file.startsWith(prefixedPath))
      .map(file => file.substring(prefixedPath.length));

    const directoriesToShow = new Set(
      fileListWithoutPrefix
        .filter(file => file.includes('/'))
        .map(file => `${prefixedPath}${file.split('/')[0]}/`)
    );

    const filesToShow = fileListWithoutPrefix
      .filter(file => !file.includes('/'))
      .map(file => ({ path: `${prefixedPath}${file}` }));

    return (
      <div style={{ marginLeft: `${0.5 * depth}rem` }}>
        {Array.from(directoriesToShow).map(dir => (
          <Directory
            key={dir}
            prefixedPath={dir}
            files={files}
            selectFile={selectFile}
            activePath={activePath}
            depth={depth + 1}
          />
        ))}

        {filesToShow.map(file => (
          <File
            key={file.path}
            selectFile={this.props.selectFile}
            path={file.path}
            active={activePath === file.path}
          />
        ))}
      </div>
    );
  }
}