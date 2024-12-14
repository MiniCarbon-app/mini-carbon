package com.dicoding.minicarbon.ui.register

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.dicoding.minicarbon.data.api.ApiConfig
import com.dicoding.minicarbon.data.request.RegisterRequest
import com.dicoding.minicarbon.data.responses.RegisterResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class RegisterViewModel : ViewModel() {
    private val _registerResult = MutableLiveData<RegisterResponse>()
    val registerResult: LiveData<RegisterResponse> = _registerResult

    fun register(email: String, password: String, confirmPassword: String) {
        val client = ApiConfig.getApiService().register(RegisterRequest(email, password, confirmPassword))
        client.enqueue(object : Callback<RegisterResponse> {
            override fun onResponse(call: Call<RegisterResponse>, response: Response<RegisterResponse>) {
                // Perhatikan bagian ini
                if (response.isSuccessful) {
                    // Untuk kode 201, buat manual respons sukses
                    _registerResult.postValue(
                        RegisterResponse(
                            success = true,
                            message = response.body()?.message ?: "User registered successfully!"
                        )
                    )
                } else {
                    // Tangani error
                    val errorBody = response.errorBody()?.string()
                    _registerResult.postValue(
                        RegisterResponse(
                            success = false,
                            message = "Register failed: ${response.code()} - $errorBody"
                        )
                    )
                }
            }

            override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                _registerResult.postValue(
                    RegisterResponse(
                        success = false,
                        message = t.message ?: "Error occurred"
                    )
                )
            }
        })
    }
}