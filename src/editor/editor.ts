import { makeObservable, observable, computed, action, flow } from 'mobx';

async function randomData(): Promise<IEditorData> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    title: 'Hello World',
  };
}

interface IEditorData {
  title: string;
}

interface IEditorStyle {
  width: number;
  height: number;
}

class Editor {
  public readonly _id: string;

  public generating = false;

  public data: IEditorData = {
    title: '',
  };

  public style: IEditorStyle = {
    width: 0,
    height: 0,
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

  public onViewLayout(layout: { width: number; height: number }) {
    this.style = layout;
    console.log('layout', layout);
  }

  public updateData<T extends keyof IEditorData>(
    key: T,
    value: IEditorData[T],
  ) {
    this.data = { ...this.data, [key]: value };
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
