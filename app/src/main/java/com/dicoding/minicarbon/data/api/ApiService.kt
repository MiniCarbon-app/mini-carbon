package com.dicoding.minicarbon.data.api

import com.dicoding.minicarbon.data.request.LoginRequest
import com.dicoding.minicarbon.data.request.RegisterRequest
import com.dicoding.minicarbon.data.responses.LoginResponse
import com.dicoding.minicarbon.data.responses.RegisterResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST


interface ApiService {
    @POST("login")
    fun login(@Body request: LoginRequest): Call<LoginResponse>

    @POST("register")
    fun register(@Body request: RegisterRequest): Call<RegisterResponse>
}
