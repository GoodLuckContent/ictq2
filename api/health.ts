interface ApiRequest {
  method?: string;
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (data: unknown) => void;
}

export default function handler(_req: ApiRequest, res: ApiResponse): void {
  res.status(200).json({ status: 'ok', app: 'ICT Quiz 2' });
}
