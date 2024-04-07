import { makeObservable, observable, computed, action, flow } from 'mobx';

async function randomData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    title: 'Hello World',
  };
}

interface IRandomDataResponse {
  title: string;
}

class Editor {
  public readonly _id: string;

  constructor() {
    this._id = Date.now().toString();

    makeObservable(this, {
      data: observable,
      updateData: action,
    });
  }

  public updateData(key: string, value: any) {
    this.data[key] = value;
  }

  public data: Record<string, any> = {
    title: '',
  };

  public *generate(): Generator<
    Promise<IRandomDataResponse>,
    void,
    IRandomDataResponse
  > {
    const response = yield randomData();
    this.data = response;
  }
}

export default Editor;
