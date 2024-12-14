package com.dicoding.minicarbon.ui.register

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.dicoding.minicarbon.databinding.ActivityRegisterBinding
import com.dicoding.minicarbon.ui.login.LoginActivity
import kotlin.text.isEmpty
import kotlin.text.trim

class RegisterActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterBinding
    private val registerViewModel: RegisterViewModel by viewModels()

    private fun isValidEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupListeners()
        observeViewModel()
    }

    private fun setupListeners() {
        // Listener untuk tombol "Sign In"
        binding.signInLink.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }

        // Listener untuk tombol "Sign Up"
        binding.btnSignUp.setOnClickListener {
            val email = binding.edtEmailRegister.text.toString().trim()
            val password = binding.edtPasswordRegister.text.toString().trim()
            val confirmPassword = binding.edtConfirmRegister.text.toString().trim()

            when {
                email.isEmpty() -> {
                    Toast.makeText(this, "Email cannot be empty", Toast.LENGTH_SHORT).show()
                }
                !isValidEmail(email) -> {
                    Toast.makeText(this, "Invalid email format", Toast.LENGTH_SHORT).show()
                }
                password.isEmpty() -> {
                    Toast.makeText(this, "Password cannot be empty", Toast.LENGTH_SHORT).show()
                }
                confirmPassword.isEmpty() -> {
                    Toast.makeText(this, "Confirmation Password cannot be empty", Toast.LENGTH_SHORT).show()
                }
                password != confirmPassword -> {
                    Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show()
                }
                else -> {
                    // Mengirim data registrasi ke ViewModel
                    registerViewModel.register(email, password, confirmPassword)
                }
            }
        }
    }

    private fun observeViewModel() {
        registerViewModel.registerResult.observe(this) { response ->
            if (response.success) {
                Toast.makeText(
                    this,
                    "Register berhasil! ${response.message}",
                    Toast.LENGTH_SHORT
                ).show()
                // Navigasi ke halaman login
                val intent = Intent(this, LoginActivity::class.java)
                startActivity(intent)
                finish()
            } else {
                Toast.makeText(this, "Register gagal: ${response.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
