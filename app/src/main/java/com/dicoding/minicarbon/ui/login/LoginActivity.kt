package com.dicoding.minicarbon.ui.login

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.dicoding.minicarbon.databinding.ActivityLoginBinding
import com.dicoding.minicarbon.ui.main.MainActivity
import com.dicoding.minicarbon.ui.register.RegisterActivity

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private val loginViewModel: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupListeners()
        observeViewModel()
    }

    private fun setupListeners() {
        binding.btnSignIn.setOnClickListener {
            val email = binding.edtEmailLogin.text.toString().trim()
            val password = binding.edtPasswordLogin.text.toString().trim()

            when {
                email.isEmpty() -> {
                    Toast.makeText(this, "Email cannot be empty", Toast.LENGTH_SHORT).show()
                }
                password.isEmpty() -> {
                    Toast.makeText(this, "Password cannot be empty", Toast.LENGTH_SHORT).show()
                }
                else -> {
                    loginViewModel.login(email, password)
                }
            }
        }

        binding.signUpLink.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }
    }

    private fun observeViewModel() {
        loginViewModel.loginResult.observe(this) { response ->
            if (response.success) {
                // Tampilkan pesan sukses
                Toast.makeText(
                    this,
                    "Login berhasil! Token: ${response.token}",
                    Toast.LENGTH_SHORT
                ).show()

                // Navigasi ke MainActivity setelah login berhasil
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
                finish()
            } else {
                // Tampilkan pesan gagal
                Toast.makeText(this, "Login gagal: ${response.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun performLogout() {
        // Hapus token
        val sharedPref = getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE)
        with(sharedPref.edit()) {
            remove("AUTH_TOKEN")
            apply()
        }

        // Kembali ke layar login
        val intent = Intent(this, LoginActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }
}