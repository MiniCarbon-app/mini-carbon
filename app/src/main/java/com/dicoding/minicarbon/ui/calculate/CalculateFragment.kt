package com.dicoding.minicarbon.ui.calculate

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.dicoding.minicarbon.R
import com.dicoding.minicarbon.databinding.FragmentCalculateBinding

class CalculateFragment : Fragment() {

    private var _binding: FragmentCalculateBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCalculateBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Default fragment
        replaceFragment(TransportationFragment())

        binding.btnTransportation.setOnClickListener {
            replaceFragment(TransportationFragment())
        }

        binding.btnFood.setOnClickListener {
            replaceFragment(FoodFragment())
        }

        binding.btnElectricity.setOnClickListener {
            replaceFragment(ElectricityFragment())
        }

        binding.btnWaste.setOnClickListener {
            replaceFragment(WasteFragment())
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun replaceFragment(fragment: Fragment) {
        childFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .commit()
    }
}