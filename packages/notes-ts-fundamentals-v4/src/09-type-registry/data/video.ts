export class Video {
    issueNumber(): number {
      return 42
    }
  }
  
  declare module '../lib/registry' {
    export interface DataTypeRegistry {
      video: Video
    }
  }