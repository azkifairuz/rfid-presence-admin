export interface LoginResponse {
    data: {
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: string | null;
      ID: number;
      UserID: number;
      Email: string;
      Password: string;
      AccountType: string;
    };
    message: string;
    statusCode: number;
  }
  