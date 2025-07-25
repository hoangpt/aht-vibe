import 'package:flutter/material.dart';
import 'capture.dart';
import 'result_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SlipScan',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
        fontFamily: 'Roboto',
      ),
      home: const ModeSelectionScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class ModeSelectionScreen extends StatefulWidget {
  const ModeSelectionScreen({super.key});

  @override
  State<ModeSelectionScreen> createState() => _ModeSelectionScreenState();
}

class _ModeSelectionScreenState extends State<ModeSelectionScreen> {
  int _selectedMode = 0; // 0: Online, 1: Offline

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF3B6EF6), Color(0xFF6C3EF6)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 40),
              CircleAvatar(
                radius: 48,
                backgroundColor: Colors.white,
                child: Icon(Icons.document_scanner, size: 48, color: Color(0xFF3B6EF6)),
              ),
              const SizedBox(height: 24),
              const Text(
                'SlipScan',
                style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              const SizedBox(height: 8),
              const Text(
                'Trích xuất thông tin vận chuyển',
                style: TextStyle(fontSize: 18, color: Colors.white),
              ),
              const SizedBox(height: 32),
              const Text(
                'Chọn chế độ hoạt động',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              const SizedBox(height: 24),
              _buildModeOption(
                icon: Icons.wifi,
                title: 'Chế độ Online',
                subtitle: 'Độ chính xác cao, cần kết nối internet',
                selected: _selectedMode == 0,
                color: Colors.green,
                onTap: () => setState(() => _selectedMode = 0),
              ),
              const SizedBox(height: 16),
              _buildModeOption(
                icon: Icons.wifi_off,
                title: 'Chế độ Offline',
                subtitle: 'Hoạt động không cần internet',
                selected: _selectedMode == 1,
                color: Colors.orange,
                onTap: () => setState(() => _selectedMode = 1),
              ),
              const Spacer(),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0),
                child: SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: Color(0xFF3B6EF6),
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    icon: const Icon(Icons.arrow_forward),
                    label: const Text('Tiếp tục', style: TextStyle(fontSize: 18)),
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(builder: (_) => const ScanSlipScreen()),
                      );
                    },
                  ),
                ),
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildModeOption({
    required IconData icon,
    required String title,
    required String subtitle,
    required bool selected,
    required Color color,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 24),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.1),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: selected ? color : Colors.white.withOpacity(0.2), width: 2),
        ),
        child: Row(
          children: [
            Icon(icon, color: color, size: 32),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                  Text(subtitle, style: TextStyle(fontSize: 14, color: Colors.white)),
                ],
              ),
            ),
            Radio<int>(
              value: selected ? (_selectedMode == 0 ? 0 : 1) : (_selectedMode == 0 ? 1 : 0),
              groupValue: _selectedMode,
              onChanged: (_) => onTap(),
              activeColor: color,
            ),
          ],
        ),
      ),
    );
  }
}
