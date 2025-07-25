import 'package:flutter/material.dart';

class PersonInfo {
  final String name;
  final String phone;
  final String postalCode;
  final String address;

  PersonInfo({
    required this.name,
    required this.phone,
    required this.postalCode,
    required this.address,
  });
}

class ResultScreen extends StatelessWidget {
  final PersonInfo sender;
  final PersonInfo receiver;
  final String? slipImagePath;

  const ResultScreen({
    super.key,
    required this.sender,
    required this.receiver,
    this.slipImagePath,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text('Kết quả quét'),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: 120,
                width: double.infinity,
                color: Colors.grey[200],
                child: slipImagePath != null
                    ? Image.asset(slipImagePath!, fit: BoxFit.cover)
                    : const Center(child: Icon(Icons.image, size: 48)),
              ),
              const SizedBox(height: 8),
              const Text('Slip đã quét', style: TextStyle(color: Colors.grey)),
              const SizedBox(height: 16),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.person, color: Colors.blue),
                          SizedBox(width: 8),
                          Text('Thông tin người gửi', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                        ],
                      ),
                      const SizedBox(height: 12),
                      _InfoField(label: 'Tên người gửi', value: sender.name),
                      _InfoField(label: 'Số điện thoại', value: sender.phone),
                      _InfoField(label: 'Mã bưu chính', value: sender.postalCode),
                      _InfoField(label: 'Địa chỉ', value: sender.address),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.person_outline, color: Colors.green),
                          SizedBox(width: 8),
                          Text('Thông tin người nhận', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                        ],
                      ),
                      const SizedBox(height: 12),
                      _InfoField(label: 'Tên người nhận', value: receiver.name),
                      _InfoField(label: 'Số điện thoại', value: receiver.phone),
                      _InfoField(label: 'Mã bưu chính', value: receiver.postalCode),
                      _InfoField(label: 'Địa chỉ', value: receiver.address),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  icon: const Icon(Icons.save),
                  label: const Text('Lưu vào cơ sở dữ liệu'),
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _InfoField extends StatelessWidget {
  final String label;
  final String value;
  const _InfoField({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(color: Colors.grey)),
          const SizedBox(height: 2),
          TextFormField(
            initialValue: value,
            decoration: const InputDecoration(border: OutlineInputBorder()),
          ),
        ],
      ),
    );
  }
}
