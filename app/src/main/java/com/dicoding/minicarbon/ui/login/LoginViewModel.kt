package com.dicoding.minicarbon.ui.login

import android.app.Application
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.dicoding.minicarbon.data.api.ApiConfig
import com.dicoding.minicarbon.data.request.LoginRequest
import com.dicoding.minicarbon.data.responses.LoginResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginViewModel(application: Application) : AndroidViewModel(application) {
    private val _loginResult = MutableLiveData<LoginResponse>()
    val loginResult: LiveData<LoginResponse> = _loginResult

    fun login(email: String, password: String) {
        val client = ApiConfig.getApiService().login(LoginRequest(email, password))
        client.enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                // Log untuk debugging
                Log.d("LoginViewModel", "Response code: ${response.code()}")
                Log.d("LoginViewModel", "Response body: ${response.body()}")
                Log.d("LoginViewModel", "Response message: ${response.body()?.message}")

                if (response.isSuccessful) {
                    // Buat LoginResponse manual untuk kasus sukses
                    _loginResult.postValue(
                        LoginResponse(
                            success = true,
                            message = response.body()?.message ?: "Login successful",
                            token = null // Sesuaikan dengan kebutuhan API Anda
                        )
                    )
                } else {
                    val errorBody = response.errorBody()?.string()
                    _loginResult.postValue(
                        LoginResponse(
                            success = false,
                            message = "Login failed: ${response.code()} - $errorBody",
                            token = null
                        )
                    )
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                _loginResult.postValue(
                    LoginResponse(
                        success = false,
                        message = t.message ?: "Error occurred",
                        token = null
                    )
                )
            }
        })
    }
    fun saveUserId(userId: String) {
        val sharedPref = getApplication<Application>().getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE)
        with(sharedPref.edit()) {
            putString("USER_ID", userId)
            apply()
        }
    }

    fun logout() {
        // Hapus token dari SharedPreferences
        val sharedPref = getApplication<Application>().getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE)
        with(sharedPref.edit()) {
            remove("AUTH_TOKEN")
            apply()
        }
    }
}