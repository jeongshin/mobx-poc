import { makeObservable, observable, computed, action, flow } from 'mobx';

async function randomData(): Promise<IEditorData> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    title: 'Hello World',
    depth: {},
  };
}

interface IRandomDataResponse {
  title: string;
}

interface IEditorData {
  title: string;
  depth: Record<string, any>;
}

class Editor {
  public readonly _id: string;

  public generating = false;

  public data: IEditorData = {
    title: '',
    depth: {},
  };

  constructor() {
    this._id = Date.now().toString();

    makeObservable(this, {
      data: observable.shallow,
      updateData: action,
      generate: flow,
      generating: observable,
    });
  }

  public updateData<T extends keyof IEditorData>(
    key: T,
    value: T extends 'depth' ? Record<string, any> : IEditorData[T],
  ) {
    if (key === 'depth') {
      // @ts-ignore
      this.data.depth = { ...this.data.depth, ...value };
    } else {
      // @ts-ignore
      this.data[key] = value;
    }
  }

  public *generate(): Generator<Promise<IEditorData>, void, IEditorData> {
    try {
      this.generating = true;
      const response = yield randomData();
      this.data = response;
    } catch (error) {
      console.log(error);
    } finally {
      this.generating = false;
    }
  }
}

export default Editor;
