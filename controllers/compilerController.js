import { exec } from 'child_process';
import fs from 'fs/promises';

export const runCode = async (req, res) => {
  const { code, input } = req.body;

  const fileName = 'temp.py';
  const codePath = `./${fileName}`;

  try {
    // Kod dosyasını yaz
    await fs.writeFile(codePath, code);

    const command = `python3 ${codePath}`;
    const child = exec(command, async (error, stdout, stderr) => {
      try {
        // Dosyayı çalıştırdıktan sonra sil
        await fs.unlink(codePath);
      } catch (unlinkError) {
        console.error('Dosya silinirken hata:', unlinkError);
      }

      if (error) {
        console.error('exec hatası:', error);
        return res.status(500).json({ output: stderr || error.message });
      }

      return res.status(200).json({ output: stdout, error: stderr });
    });

    // Kullanıcı inputu varsa stdin'e yaz
    if (input) {
      child.stdin.write(input);
      child.stdin.end();
    }
  } catch (err) {
    console.error('Kod çalıştırma sırasında hata:', err);
    return res.status(500).json({ error: 'Kod çalıştırılırken bir hata oluştu' });
  }
};