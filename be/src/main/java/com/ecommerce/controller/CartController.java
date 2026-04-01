package com.ecommerce.controller;

import com.ecommerce.dto.CartRequest;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.User;
import com.ecommerce.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.getCartItems(user));
    }

    @PostMapping
    public ResponseEntity<CartItem> addToCart(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody CartRequest request) {
        return ResponseEntity.ok(cartService.addToCart(user, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateCartItem(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.updateCartItem(id, body.get("quantity"), user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeCartItem(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        cartService.removeCartItem(id, user);
        return ResponseEntity.ok().build();
    }
}
