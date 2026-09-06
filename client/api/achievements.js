export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const data = [
    {
      id: 1,
      title: 'Winner — College Level Ideation Challenge 2024',
      organization: 'Anna University Affiliated Campus',
      description: 'Won first place for proposing and demonstrating the Smart Social Security Fund Cessation System. Built an innovative conceptual model that automatically detects and resolves inactive fund leaks, streamlining public distribution.',
      year: '2024',
      image: null
    }
  ];

  return res.status(200).json({
    success: true,
    count: data.length,
    data
  });
}
